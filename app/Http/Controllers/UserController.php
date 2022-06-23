<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function showUser(Request $request) {
      $query = User::orderBy($request->column, $request->order);
      $users = $query->paginate($request->per_page ?? 5);

      return UserResource::collection($users);
    }
}
