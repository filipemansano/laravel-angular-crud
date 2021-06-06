<?php

namespace App\Traits;

use InvalidArgumentException;
use App\DTO\FieldFilter;

trait Pagination {

    private $mappedColumns = [];
    private $mappedColumnsKeys = [];

    private function initMappingColumns(){

        $fields = [];

        foreach([$this->guarded, $this->hidden, $this->fillable] as $columns){
            foreach($columns as $column){
                $fields[$column] = 'commom';
            }
        }

        if(isset($this->relatedColumnMapping) && count($this->relatedColumnMapping) > 0){
            foreach(array_keys($this->relatedColumnMapping) as $column){
                $fields[$column] = 'related';
            }
        }

        $this->mappedColumns = $fields;
        $this->mappedColumnsKeys = array_keys($fields);
    }

    public function scopeSort($query, $column, $direction){

        if($column && $direction){
            //$this->validateColumn($column);
            $direction = $direction == '1' ? 'ASC' : 'DESC';
            $query = $query->orderBy($column, $direction);
        }

        return $query;
    }

    public function scopeFilters($query, $filters){

        if (isset($filters)) {

            $this->initMappingColumns();

            foreach ($filters as $key => $row) {

                $mapping = $this->mappingFields($key, $row);

                $whereGroupFunction = $mapping['operatorGroup'] === 'OR' ? 'orWhere' : 'where';

                $query->where(function($query) use ($mapping, $whereGroupFunction){

                    foreach($mapping['rules'] as $rule){

                        $has = $rule->getHas();
                        $noHas = $rule->getNotHas();

                        if($has || $noHas ){

                            if($has){
                                $query->whereHas($has, function($query) use ($rule, $whereGroupFunction){
                                    $this->buildQueryValue($query, $whereGroupFunction, $rule);
                                });
                            }

                            else if($noHas){
                                $query->whereDoesntHave($noHas, function($query) use ($rule, $whereGroupFunction){
                                    $this->buildQueryValue($query, $whereGroupFunction, $rule);
                                });
                            }
                        }

                        else{
                            $this->buildQueryValue($query, $whereGroupFunction, $rule);
                        }

                    }
                });
            }
        }

        return $query;
    }

    private function buildQueryValue(&$query, $whereGroupFunction, $field){

        if(!is_array($field->getValue())){

            $query->where(
                $field->getColumn(),
                $field->getOperator(),
                $field->getValue()
            );

            return;
        }

        foreach($field->getValue() as $value){
            $query->$whereGroupFunction(
                $field->getColumn(),
                $field->getOperator(),
                $value
            );
        }
    }

    private function mappingFields($column, $data){

        if(!in_array($column, $this->mappedColumnsKeys)){
            throw new InvalidArgumentException("field {$column} not mapped in model");
        }

        $operatorGroup = $data['operator'] ? strtoupper($data['operator']) : 'OR';

        if(!in_array($operatorGroup, ['OR', 'AND'])){
            throw new InvalidArgumentException("operator in column {$column} is invalid");
        }

        if(!isset($data['rules']) || !is_array($data['rules']) || count($data['rules']) === 0){
            throw new InvalidArgumentException("no rules found for column {$column}");
        }

        $rules = [];

        foreach($data['rules'] as $rule => $values){

            switch($rule){

                case 'startsWith':
                    $operator = FieldFilter::LIKE;
                    $value = array_map(fn($v) => "{$v}%", $values);
                break;

                case 'contains':
                    $operator = FieldFilter::LIKE;
                    $value = array_map(fn($v) => "%{$v}%", $values);
                break;

                case 'notContains':
                    $operator = FieldFilter::NOT_LIKE;
                    $value = array_map(fn($v) => "%{$v}%", $values);
                break;

                case 'endsWith':
                    $operator = FieldFilter::LIKE;
                    $value = array_map(fn($v) => "%{$v}", $values);
                break;

                case 'equals':

                    if(count($values) > 1){
                        $operator = FieldFilter::IN;
                        $value = $values;
                    }else{
                        $operator = FieldFilter::EQUAL;
                        $value = array_shift($values);
                    }

                break;

                case 'notEquals':

                    if(count($values) > 1){
                        $operator = FieldFilter::NOT_IN;
                        $value = $values;
                    }else{
                        $operator = FieldFilter::NOT_EQUAL;
                        $value = array_shift($values);
                    }

                break;

                default:
                    throw new InvalidArgumentException("{$rule} not mapped");
                break;
            }

            $field = new FieldFilter();
            $field->setOperator($operator);
            $field->setColumn($column);
            $field->setValue($value);

            if($this->mappedColumns[$column] === 'related'){

                if(in_array($operator, [FieldFilter::NOT_IN, FieldFilter::NOT_EQUAL])){

                    $field->setNotHas($this->relatedColumnMapping[$column]);

                    if($operator === FieldFilter::NOT_IN){
                        $field->setOperator(FieldFilter::IN);
                    }else{
                        $field->setOperator(FieldFilter::EQUAL);
                    }

                }else{
                    $field->setHas($this->relatedColumnMapping[$column]);
                }
            }

            $rules[] = $field;
        }

        return [
            'operatorGroup' => $operatorGroup,
            'rules' => $rules
        ];
    }
}
