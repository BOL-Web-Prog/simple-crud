<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
      $users = User::get();
      return Inertia::render('Users', ['users' => $users]);
    }
}
