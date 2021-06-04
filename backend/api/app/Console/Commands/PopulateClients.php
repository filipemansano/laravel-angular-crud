<?php

namespace App\Console\Commands;

use App\Models\City;
use App\Models\Client;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Console\Command;

class PopulateClients extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'populate:clients';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate initials clients';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    private function getData(): array
    {
        return [
            ['Claudianus Boast', 'cboast0@fastcompany.com', '(19) 957645371', 'São Paulo', 'Araraquara', '07/06/1993'],
            ['Loni Jennions', 'ljennions1@va.gov', '(19) 905613161', 'São Paulo', 'Limeira', '09/05/1985'],
            ['Margi Gilhouley', 'mgilhouley2@telegraph.co.uk', '(19) 966290104', 'São Paulo', 'Araraquara', '13/09/1984'],
            ['Lexy Sprulls', 'lsprulls3@moonfruit.com', '(19) 976121601', 'São Paulo', 'Rio Claro', '19/10/1999'],
            ['Marie Shatliff', 'mshatliff4@cbslocal.com', '(19) 991376354', 'São Paulo', 'Rio Claro', '20/07/1990'],
            ['Graig Mouncey', 'gmouncey5@so-net.ne.jp', '(19) 941806149', 'São Paulo', 'Araraquara', '27/03/1990'],
            ['Laurice Liger', 'lliger0@php.net', '(35) 971740954', 'Minas Gerais', 'Areado', '25/10/1992'],
            ['Kendrick Sooper', 'ksooper1@slate.com', '(31) 944324086', 'Minas Gerais', 'Belo Horizonte', '02/06/1981'],
            ['Gordon Levington', 'glevington2@hpost.com', '(31) 922405868', 'Minas Gerais', 'Belo Horizonte', '25/11/1993'],
            ['Noam Scolland', 'nscolland3@mozilla.org', '(35) 996817669', 'Minas Gerais', 'Areado', '31/12/1999'],
            ['Lindon Skehens', 'lskehens4@npr.org', '(35) 967671104', 'Minas Gerais', 'Areado', '10/01/1985'],
            ['Kimbra Rase', 'krase5@topsy.com', '(35) 999428030', 'Minas Gerais', 'Areado', '05/05/1999'],
            ['Lorenzo Fisk', 'lfisk6@businessweek.com', '(31) 912695467', 'Minas Gerais', 'Belo Horizonte', '22/12/1985'],
            ['Bourke Flavelle', 'bflavelle7@fc2.com', '(35) 959386145', 'Minas Gerais', 'Itapeva', '10/04/1984'],
            ['Curran McSharry', 'cmcsharry8@webeden.co.uk', '(35) 902916131', 'Minas Gerais', 'Itapeva', '15/01/1983'],
            ['Aveline Dowtry', 'adowtry9@miibeian.gov.cn', '(31) 945227500', 'Minas Gerais', 'Belo Horizonte', '23/12/1994'],
            ['John Sebastian', 'jsebastiana@cbslocal.com', '(31) 907366740', 'Minas Gerais', 'Belo Horizonte', '06/04/1998'],
            ['Reynolds Greenan', 'rgreenanb@bloomberg.com', '(35) 923551410', 'Minas Gerais', 'Itapeva', '19/07/1985'],
        ];
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $data = $this->getData();

        foreach($data as $client){

            list($name, $email, $phone, $state, $city, $birthDay) = $client;

            $cityId = City::findByNameAndState($city, $state)->firstOrFail();
     
            $client = Client::firstOrCreate(['email' => $email],[
                'name'      => $name, 
                'phone'     => $phone,
                'city_id'   => $cityId->id,
                'birth_day' => Carbon::createFromFormat('d/m/Y', $birthDay),
            ]);

            $plans = $client->plans();

            if($plans->count() === 0){
                $plans->attach(Plan::FREE_PLAN);
            }
        }
    }
}