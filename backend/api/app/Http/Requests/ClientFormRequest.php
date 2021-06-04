<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientFormRequest extends FormRequest
{
    /**
     * Indicates if the validator should stop on the first rule failure.
     *
     * @var bool
     */
    protected $stopOnFirstFailure = false;

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
            'name' => 'required|max:100',
            'phone' => 'required|regex:/^\([0-9]{2}\)\s[0-9]{8,9}$/i',
            'city_id' => 'required|exists:cities,id',
            'birth_day' => 'required|date_format:Y-m-d|before:today',
            'email' => [
                'required',
                'email',
                'unique' => Rule::unique('clients')->ignore(request()->route('client'))->where(function ($query) {
                    return $query->where([
                        'email' => request()->get('email'),
                    ]);
                })
            ]
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'name' => 'nome',
            'phone' => 'Telefone',
            'city_id' => 'Cidade',
            'birth_day' => 'Data de nascimento',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            '*.required'            => 'O campo :attribute é obrigatório',
            '*.max'                 => 'O campo :attribute deve ter no máximo :max caracteres',
            'city_id.exists'        => 'A cidade informada não existe',
            'phone.regex'           => 'O telefone informado não está no padrão (xx) xxxxxxxxx',
            'birth_day.date_format' => 'A data de nascimento informada é inválida',
            'birth_day.before'      => 'A data de nascimento deve ser um dia inferior a hoje',
            'email.email'           => 'O Email informado está inválido',
            'email.unique'          => 'Já existe um cliente atribuido a esse email',
        ];
    }
}
