<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255|unique:categories,name,' . $this->route('id'),
            'link' => 'required|string|max:255',
        ];

        if ($this->isMethod('put')) {
            $rules['is_draft'] = 'boolean';
        }

        return $rules;
    }

    protected function failedValidation(Validator $validator)
    {
        return back()->withErrors($validator)->withInput();
    }
}
