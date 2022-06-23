<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;

class UserController extends Controller
{
    public function showUser() {
      $query = $this->user->orderBy($request->column, $request->order);
      $users = $query->paginate($request->per_page ?? 5);

      return UsersResource::collection($users);
    }
}
