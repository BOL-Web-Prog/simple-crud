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
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('role_id');
            $table->timestamps();
        });

        Schema::table('permissions', function (Blueprint $table) {
          $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permissions', function($table) {
          $table->dropForeign('permissions_role_id_foreign');
          $table->dropIndex('permissions_role_id_index');
          $table->dropColumn('role_id');
        });
        Schema::dropIfExists('permissions');
    }
};
