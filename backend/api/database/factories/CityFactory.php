<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\State;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = City::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->city(),
            'state_id' => State::factory(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }
}
