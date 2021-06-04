<?php

namespace Tests\Unit\Client;

use App\Http\Requests\ClientFormRequest;
use App\Models\City;
use App\Models\Client;
use Database\Seeders\ClientSeeder;
use Faker\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientFormRequestTest extends TestCase
{
    use RefreshDatabase;

    /** @var \App\Http\Requests\ClientFormRequest */
    private $rules;

    /** @var \Illuminate\Validation\Validator */
    private $validator;

    public function setUp(): void
    {
        parent::setUp();

        $this->validator = app()->get('validator');

        $this->seed(ClientSeeder::class);

        $this->rules = (new ClientFormRequest())->rules();
    }

    public function validationProvider()
    {
        $this->refreshApplication();

        /* WithFaker trait doesn't work in the dataProvider */
        $faker = Factory::create(Factory::DEFAULT_LOCALE);

        return [
            'request_should_fail_when_no_name_is_provided' => [
                'passed' => false,
                'data' => []
            ],
            'request_should_fail_when_name_is_bigger' => [
                'passed' => false,
                'data' => [
                    'name' => str_repeat('a', 101)
                ]
            ],
            'request_should_fail_when_no_phone_is_provided' => [
                'passed' => false,
                'data' => [
                    'whatever' => 'em breve uma grande questão'
                ]
            ],
            'request_should_fail_when_phone_is_invalid_pattern' => [
                'passed' => false,
                'data' => [
                    'phone' => '4dsf54ds5'
                ]
            ],
            'request_should_fail_when_no_city_provided' => [
                'passed' => false,
                'data' => [
                    'whatever' => 'é biscoito ou bolacha?'
                ]
            ],
            'request_should_fail_when_no_city_exists' => [
                'passed' => false,
                'data' => [
                    'city_id' => -1
                ]
            ],
            'request_should_fail_when_no_birth_day_provided' => [
                'passed' => false,
                'data' => [
                    'whatever' => 'em sp é bolacha'
                ]
            ],
            'request_should_fail_when_birth_day_is_invalid_format' => [
                'passed' => false,
                'data' => [
                    'birth_day' => '12/12/1222'
                ]
            ],
            'request_should_fail_when_birth_day_is_today' => [
                'passed' => false,
                'data' => [
                    'birth_day' => date('Y-m-d')
                ]
            ],
            'request_should_fail_when_no_email_provided' => [
                'passed' => false,
                'data' => [
                    'whatever' => 'no rio é biscoito'
                ]
            ],
            'request_should_fail_when_email_is_invalid_format' => [
                'passed' => false,
                'data' => [
                    'email' => 'naotemarroba.com.br'
                ]
            ],
            'request_should_fail_when_email_exists' => [
                'passed' => false,
                'data' => [
                    'email' => '{{email}}',
                ]
            ],
            'request_should_success_when_body_is_correct' => [
                'passed' => true,
                'data' => [
                    'name'      => $faker->name(),
                    'phone'     => '(19) 999999999',
                    'city_id'   => '{{city}}',
                    'birth_day' => '1993-03-02',
                    'email'     => 'filipemansano@gmail.com'
                ]
            ]
        ];
    }

    /**
     * @test
     * @dataProvider validationProvider
     * @param bool $shouldPass
     * @param array $mockedRequestData
     */
    public function validation_results_as_expected($shouldPass, $mockedRequestData)
    {

        $client = Client::first();

        foreach($mockedRequestData as &$value){
            if($value === '{{email}}'){
                $value = $client->email;
            }

            if($value === '{{city}}'){
                $value = $client->city_id;
            }
        }

        $validate = $this->validator->make($mockedRequestData, $this->rules);

        $this->assertEquals(
            $shouldPass,
            $validate->passes(),
            $validate->errors()
        );
    }
}
