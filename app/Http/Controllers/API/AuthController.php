<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        $user = new User([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $user->save();
        $data = $this->login($request);
        return response()->json($data, 201);
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function test(Request $request)
    {
        $data = $this->login($request);
        return response()->json($data);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Email atau password anda salah'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token', [$user->role]);
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        } else {
            $token->expires_at = Carbon::now()->addDay(1);
        }
        $token->save();
        return response()->json([
            'user' => $user,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
    }

    public function redirectToProviderAll(){
        return response()->json([
            'google' => $this->redirectToGoogle(),
            'facebook' => $this->redirectToFacebook(),
        ]);
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = (object)[];

        DB::transaction(function () use ($googleUser, &$user) {
            $socialAccount = SocialAccount::firstOrNew(
                ['social_id' => $googleUser->getId(), 'social_provider' => 'google'],
                ['social_name' => $googleUser->getName()]
            );

            if (!($user = $socialAccount->user)) {
                $user = User::create([
                    'email' => $googleUser->getEmail(),
                    'first_name' => $googleUser->user['given_name'],
                    'last_name' => $googleUser->user['family_name'],
                ]);
                $socialAccount->fill(['user_id' => $user->id])->save();
            }
        });

        return response()->json([
            'access_token' => $user->createToken('Personal Access Token', [$user->role])->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $user->createToken('Personal Access Token', [$user->role])->token->expires_at
            )->toDateTimeString(),
            'user' => $user,
            'provider_user' => $googleUser,
        ], 201);
    }
    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->stateless()->redirect()->getTargetUrl();
    }

    public function handleFacebookCallback()
    {
        $facebookUser = Socialite::driver('facebook')->stateless()->user();
        $user = (object)[];

        DB::transaction(function () use ($facebookUser, &$user) {
            $socialAccount = SocialAccount::firstOrNew(
                ['social_id' => $facebookUser->getId(), 'social_provider' => 'facebook'],
                ['social_name' => $facebookUser->getName()]
            );

            if (!($user = $socialAccount->user)) {
                $user = User::create([
                    'email' => $facebookUser->getEmail(),
                    'first_name' => $facebookUser->user['name'],
                ]);
                $socialAccount->fill(['user_id' => $user->id])->save();
            }
        });

        return response()->json([
            'access_token' => $user->createToken('Personal Access Token', [$user->role])->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $user->createToken('Personal Access Token', [$user->role])->token->expires_at
            )->toDateTimeString(),
            'user' => $user,
            'provider_user' => $facebookUser,
        ], 201);
    }
}
