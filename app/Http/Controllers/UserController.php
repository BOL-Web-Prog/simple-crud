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

    public function updateUser(Request $request) {
      $user = User::find($request->id);

      $user->name = $request['name'];
      $user->email = $request['email'];
      $user->password = $request['password'];
      $user->birthdate = $request['birthdate'];
      $user->birthplace = $request['birthplace'];
      $user->gender = $request['gender'];

      $user->save();

      return response()->json([
        'status' => '00',
        'message' => 'success'
      ]);
    }

    public function deleteUser($id) {
      $user = User::find($id);
      $user->delete();
      return response()->json([
        'status' => '00',
        'message' => 'success'
      ]);
    }
}
