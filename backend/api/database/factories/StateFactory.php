<?php

namespace Database\Factories;

use App\Models\State;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class StateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = State::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'initials' => $this->faker->unique()->lexify('??'),
            'name' => $this->faker->unique()->state(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }
}
