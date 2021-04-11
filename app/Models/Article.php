<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = "articles";
    protected $fillable = ['title', 'slug', 'content', 'image', 'view_count'];
    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }

}
