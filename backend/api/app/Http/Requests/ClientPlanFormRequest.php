<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientPlanFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'plans'   => 'array|min:1',
            'plans.*' => 'integer',
        ];
    }


    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function messages()
    {
        return [
            'plans.array'     => 'Planos deve ser uma lista',
            'plans.min'       => 'Pelo menos um plano deve ser informado',
            'plans.*.integer' => 'Planos deve ser um numero inteiro',
        ];
    }
}
