<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false);
            $table->string('email')->unique()->nullable(false);
            $table->string('phone', 15)->nullable(false);
            $table->foreignId('city_id')->nullable(false);
            $table->date('birth_day')->nullable(false);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('city_id')
                    ->references('id')
                    ->on('cities')
                    ->onDelete('restrict');
        });

        Schema::create('client_plan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id');
            $table->foreignId('plan_id');
            $table->timestamps();

            $table->foreign('client_id')
                    ->references('id')
                    ->on('clients')
                    ->onDelete('cascade');

            $table->foreign('plan_id')
                    ->references('id')
                    ->on('plans')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_plan');
        Schema::dropIfExists('clients');
    }
}
