<?php

namespace App\Console\Commands;

use App\Models\City;
use App\Models\State;
use Illuminate\Console\Command;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

use function Ramsey\Uuid\v1;

class PopulateCities extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'populate:cities';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate Cities/Sate table with API of IBGE';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    private function getStateData() : array
    {
        try{
            $this->warn('Requesting data [CACHED]');
            return json_decode(Storage::disk('local')->get('locations/states.json'), true);
        }catch(FileNotFoundException $e){

            $this->warn('Requesting data');
            $response = Http::get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

            if($response->successful()) {
                return $response->json();
            }

            $this->error('bad response, status code: ' . $response->status());
            return [];
        }
    }

    private function getCitiesByStateData(int $stateId) : array
    {
    
        try{
            $this->warn('Requesting data [CACHED]');
            return json_decode(Storage::disk('local')->get('locations/cities_'. $stateId.'.json'), true);
        }catch(FileNotFoundException $e){

            $this->warn('Requesting data');
            $response = Http::get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' .$stateId. '/municipios');

            if($response->successful()) {
                return $response->json();
            }

            $this->error('bad response, status code: ' . $response->status());
            return [];
        }
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->loadState();
        $this->loadCities();
    }

    private function loadState()
    {
        
        $data = $this->getStateData();
        $this->info(count($data) . ' states founds');
        
        State::unguard(true);
        DB::beginTransaction();

        // store result in disk to avoid call api again
        $diskCache = [];

        try{
            foreach ($data as $uf) {
                State::updateOrCreate(['id' => $uf['id']],
                    [
                        'name' => $uf['nome'], 
                        'initials' => $uf['sigla'],
                    ],
                );

                $diskCache[] = [
                    'id' => $uf['id'],
                    'nome' => $uf['nome'],
                    'sigla' => $uf['sigla'],
                ];

                $this->info($uf['nome'] . ' inserted successfully');
            }
            
        }catch( \Throwable $e){
            DB::rollBack();
            throw $e;
        }
        
        Storage::disk('local')->put('locations/states.json', json_encode($diskCache));
        DB::commit();

        State::unguard(false);
    }

    private function loadCities()
    {

        $states = State::all(['id', 'initials']);

        City::unguard(true);

        foreach ($states as $state) {

            $data = $this->getCitiesByStateData($state['id']);
            $this->info(count($data) . ' cities founds from state ' . $state['initials']);
            
            DB::beginTransaction();

            // store result in disk to avoid call api again
            $diskCache = [];

            try{
                foreach ($data as $city) {
                    City::updateOrCreate([ 'id' => $city['id']],
                        [
                            'name' => $city['nome'], 
                            'state_id' => $state['id'],
                        ],
                    );
                    
                    $diskCache[] = [
                        'id' => $city['id'],
                        'nome' => $city['nome'],
                    ];
                }
            }catch( \Throwable $e){
                DB::rollBack();
                throw $e;
            }

            $this->info(count($diskCache) . ' inserted successfully');
            
            Storage::disk('local')->put('locations/cities_'.$state['id'].'.json', json_encode($diskCache));
            DB::commit();
        }

        City::unguard(false);
    }
}