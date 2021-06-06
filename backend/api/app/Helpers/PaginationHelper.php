<?php

use App\Http\Resources\ClientResource;
use Illuminate\Support\Facades\DB;

/**
 * aplly sort, filter, pagination into model
 * and return response json with data
 * @param Model|Builder $model
 */
function pagination($model, $resource = null){

    //DB::enableQueryLog();

    $dados = $model->filters(request('filter'))
                ->sort(request('sort'), request('sort-direction'));

    $limit = request('limit') ?? 10;

    if($limit === '-1'){
        $limit = 1000;
    }

    $dados = $dados->paginate($limit);

    //dd(DB::getQueryLog());

    $total = $dados->total();

    $pk = $model->getKeyName();
    $entities = $dados->items();

    return [
        'data' => !is_null($resource) ? $resource::collection($entities) : $entities,
        'pageInfo' => [
            'first' => $total === 0 ? 0 : $dados->firstItem() - 1,
            'last' => $total === 0 ? 0 : $dados->lastItem() - 1,
            'total' => $dados->total(),
            'ids' => array_map(fn($entity) => $entity[$pk], $entities),
            'perPage' => intval($dados->perPage()),
            'currentPage' => $dados->currentPage(),
            'lastPage' => $dados->lastPage(),
            'traceKey' => request('traceKey')
        ]
    ];

}

