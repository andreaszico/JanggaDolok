<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function child()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
