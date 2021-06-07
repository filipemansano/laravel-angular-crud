<?php

namespace Tests\Integration;

use App\Models\City;
use App\Models\Client;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\Passport;
use Tests\TestCase;

class ClientControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        Passport::actingAs(
            User::factory()->create(),
            ['*']
        );
    }


    /** @test */
    public function it_can_create_client() {

        $city = City::factory()->create();
        
        $data = [
            'name'      => $this->faker->name(),
            'phone'     => '(19) 999999999',
            'city_id'   => $city->id,
            'birth_day' => '1993-03-02',
            'email'     => $this->faker->email()
        ];

        $this->json('POST','/clients', $data)
            ->assertStatus(201)
            ->assertJson([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'state' => $city->state->name,
                'city' => [
                    'id' => $city->id,
                    'name' => $city->name
                ],
                'plans' => [
                    [
                        'id' => $this->plan->id,
                        'name' => $this->plan->name,
                        'monthly_payment' => $this->plan->monthly_payment,
                    ]
                ],
                'birth_day' => $data['birth_day']
            ]);
    }

    /** @test */
    public function it_can_update_client() {

        $client = Client::factory()->create();
        $city = City::factory()->create();
        
        $data = [
            'name'      => $this->faker->name(),
            'phone'     => '(19) 999999999',
            'city_id'   => $city->id,
            'birth_day' => '1993-03-02',
            'email'     => $this->faker->email()
        ];

        $this->json('PUT','/clients/' . $client->id, $data)
            ->assertStatus(200)
            ->assertJson([
                'id'    => $client->id,
                'name'  => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'state' => $city->state->name,
                'city' => [
                    'id' => $city->id,
                    'name' => $city->name
                ],
                'birth_day' => $data['birth_day']
            ]);
    }

    /** @test */
    public function it_can_show_client() {

        $client = Client::factory()->create();

        $this->json('GET','/clients/' . $client->id)
            ->assertStatus(200)
            ->assertJson([
                'id'    => $client->id,
                'name'  => $client->name,
                'email' => $client->email,
                'phone' => $client->phone,
                'state' => $client->city->state->name,
                'city' => [
                    'id' => $client->city->id,
                    'name' => $client->city->name
                ],
                'birth_day' => $client->birth_day->format('Y-m-d')
            ]);
    }

     /** @test */
    public function it_can_delete_client() {

        $client = Client::factory()->create();

        $this->json('DELETE','/clients/' . $client->id)
            ->assertStatus(204);
    }

     /** @test */
    public function it_can_list_clients() {

        Client::factory()->count(3)->create();

        $total = Client::all()->count();

        $this->json('GET','/clients')
            ->assertStatus(200)
            //->assertJsonCount($total)
            ->assertJsonStructure([
               'data' => [
                    '*' => [ 'id', 'name', 'phone', 'email', 'state', 'city' => ['id', 'name'], 'birth_day']
               ],
            ]);
    }
}
