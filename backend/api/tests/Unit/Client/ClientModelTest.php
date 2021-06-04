<?php

namespace Tests\Unit\Client;

use App\Models\City;
use App\Models\Client;
use App\Models\Plan;
use App\Models\State;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ClientModelTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_can_delete_the_client()
    {
        $client = Client::factory()->create();
        $deleted = Client::destroy($client->id);

        $this->assertEquals(1, $deleted);
    }

    /** @test */
    public function it_can_update_the_client()
    {
        $client = Client::factory()->create();

        $data = [
            'name'      => $this->faker->name(),
            'phone'     => '(19) 999999999',
            'city_id'   => City::factory()->create()->id,
            'birth_day' => '1993-03-02',
            'email'     => $this->faker->email()

        ];

        $model = Client::where(['id' => $client->id]);
        $model->update($data);

        $update = $model->first();

        $this->assertInstanceOf(Client::class, $update);
        $this->assertEquals($data['name'], $update->name);
        $this->assertEquals($data['phone'], $update->phone);
        $this->assertEquals($data['city_id'], $update->city_id);
        $this->assertEquals($data['birth_day'], $update->birth_day->format('Y-m-d'));
        $this->assertEquals($data['email'], $update->email);
    }

    /** @test */
    public function it_can_show_the_client()
    {
        $client = Client::factory()->create();
        $found = Client::findOrFail($client->id);

        $this->assertInstanceOf(Client::class, $found);
        $this->assertEquals($found->name, $client->name);
        $this->assertEquals($found->phone, $client->phone);
        $this->assertEquals($found->city_id, $client->city_id);
        $this->assertEquals($found->birth_day, $client->birth_day);
        $this->assertEquals($found->email, $client->email);
    }

    /** @test */
    public function it_can_make_a_client()
    {
        $data = [
            'name'      => $this->faker->name(),
            'phone'     => '(19) 999999999',
            'city_id'   => City::factory()->create()->id,
            'birth_day' => '1993-03-02',
            'email'     => $this->faker->email()

        ];

        $client = Client::create($data);

        $this->assertInstanceOf(Client::class, $client);
        $this->assertEquals($data['name'], $client->name);
        $this->assertEquals($data['phone'], $client->phone);
        $this->assertEquals($data['city_id'], $client->city_id);
        $this->assertEquals($data['birth_day'], $client->birth_day->format('Y-m-d'));
        $this->assertEquals($data['email'], $client->email);
    }


    // negative tests

    /** @test */
    public function it_should_throw_update_error_exception_when_the_client_has_failed_to_update()
    {
        $this->expectException(QueryException::class);

        $client = Client::factory()->create();

        $data = ['name' => null];
        Client::where(['id' => $client->id])->update($data);
    }

     /** @test */
    public function it_should_throw_not_found_error_exception_when_the_client_is_not_found()
    {
        $this->expectException(ModelNotFoundException::class);
        Client::findOrFail(999);
    }

    /** @test */
    public function it_should_throw_an_error_when_the_required_columns_are_not_filled()
    {
        $this->expectException(QueryException::class);
        Client::create([]);
    }

    /** @test */
    public function it_should_throw_an_error_when_delete_sao_paulo_free_client()
    {
        $saopaulo = State::factory(['name' => 'São Paulo'])->create()->id;
        $city = City::factory(['state_id' => $saopaulo])->create()->id;

        $client = Client::factory(['city_id' => $city])->hasAttached(
            Plan::factory(['id' => Plan::FREE_PLAN]),
        )->create();

        $this->expectExceptionMessage("Clientes do plano FREE, do estado de São Paulo, não podem ser excluídos");
        $client->delete();
    }
}
