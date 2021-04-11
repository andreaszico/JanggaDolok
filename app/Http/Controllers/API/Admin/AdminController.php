<?php

namespace App\Http\Controllers\API\Admin;

    use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use App\Models\Visitor;
use Carbon\Carbon;
use DateTime;
use Illuminate\Cache\Repository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response()->json([
            'message' => 'JUST FOR FUN'
        ]);
    }

    public function getAllUsers(){
        $data = DB::table('comments')->get();
        return response()->json($data, 201);
    }


    public function getDataWeb(){
        $views = DB::table('visitor')->count();
        $article = DB::table('articles')->count();
        $comment = DB::table('comments')->count();

        $data = [
            'views' => $views,
            'article' => $article,
            'comment' => $comment,
            'chart' => $this->getMonthlyPostData()
        ];
        return response()->json($data, 201);
    }

    public function destroy($id)
    {
        $user = Comment::find($id);
        if (!empty($user)) {
            $user->delete();
            $msg = [
                'success' => true,
                'message' => 'User deleted successfully!',
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'User deleted failed!'
            ];
            return response()->json($msg);
        }
    }

    function getAllMonths(){
        $start =  date('Y-m-d H:i:s', strtotime('+6 day', strtotime(Carbon::now())));
        $end =  date('Y-m-d H:i:s', strtotime(Carbon::now()));
		$posts_dates = DB::table('visitor')->whereBetween('created_at', array($end, $start))->orderBy('created_at')->get();
		$month_array = array();
		$posts_dates = json_decode( $posts_dates );

		if ( ! empty( $posts_dates ) ) {
			foreach ( $posts_dates as $unformatted_date ) {
				$date = new DateTime( $unformatted_date->created_at);
				$month_no = $date->format( 'd' );
				$month_name = $date->format( 'd M Y' );
				$month_array[ $month_no ] = $month_name;
			}
		}
		return $month_array;
	}

	function getMonthlyPostCount( $month ) {
		$monthly_post_count = Visitor::whereDay('created_at', $month )->get()->count();
		return $monthly_post_count;
	}

	function getMonthlyPostData() {

		$monthly_post_count_array = [];
		$month_array = $this->getAllMonths();
		$month_name_array = [];
		if ( ! empty( $month_array ) ) {
			foreach ( $month_array as $month_no => $month_name ){
				$monthly_post_count = $this->getMonthlyPostCount( $month_no );
				array_push( $monthly_post_count_array, $monthly_post_count );
				array_push( $month_name_array, $month_name );
			}
		}

		$max_no = max( $monthly_post_count_array );
		$max = round(( $max_no + 10/2 ) / 10 ) * 10;
		$monthly_post_data_array = [
			'months' => $month_name_array,
			'post_count_data' => $monthly_post_count_array,
			'max' => $max,
        ];
        
        return $monthly_post_data_array;

    }
}
