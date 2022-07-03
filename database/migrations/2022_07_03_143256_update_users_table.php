<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('users', function($table) {
        $table->string('birthdate');
        $table->string('birthplace');
        $table->string('gender');
        $table->string('role_id');
        $table->index('role_id');
        $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('users', function($table) {
        $table->dropColumn('birthdate');
        $table->dropColumn('birthplace');
        $table->dropColumn('gender');
        $table->dropForeign('lists_role_id_foreign');
        $table->dropIndex('lists_role_id_index');
        $table->dropColumn('role_id');
      });
    }
};
