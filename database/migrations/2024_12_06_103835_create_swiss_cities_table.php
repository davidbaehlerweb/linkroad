<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSwissCitiesTable extends Migration
{
    public function up()
    {
        Schema::create('swiss_cities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('canton');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('swiss_cities');
    }
}
