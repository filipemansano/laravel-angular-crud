<?php

namespace App\DTO;

use Closure;

class FieldFilter {

    /**
     * Comparison Functions and Operators
     * @see https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html
     */
    public const GREATER_THAN = '>';
    public const GREATER_THAN_OR_EQUAL = '>=';
    public const LESS_THAN = '<';
    public const LESS_THAN_OR_EQUAL = '<=';
    public const NOT_EQUAL = '<>';
    public const NULL_SAFE_EQUAL = '<=>';
    public const EQUAL = '=';
    public const BETWEEN = 'BETWEEN';
    public const COALESCE = 'COALESCE';
    public const GREATEST = 'GREATEST';
    public const IN = 'IN';
    public const INTERVAL = 'INTERVAL';
    public const IS = 'IS';
    public const IS_NOT = 'IS NOT';
    public const IS_NOT_NULL = 'IS NOT NULL';
    public const ISNULL = 'ISNULL';
    public const LEAST = 'LEAST';
    public const LIKE = 'LIKE';
    public const NOT_BETWEEN = 'NOT_BETWEEN';
    public const NOT_IN = 'NOT_IN';
    public const NOT_LIKE = 'NOT_LIKE';
    public const STRCMP = 'STRCMP';

    private $value = NULL;
    private string $column;
    private ?string $operator = NULL;
    private ?string $has = NULL;
    private ?string $notHas = NULL;
    private ?Closure $customWhere = NULL;
    private ?Closure $customSort = NULL;

    public function getColumn(){
        return $this->column;
    }

    public function getOperator(){
        return $this->operator;
    }

    public function getValue(){
        return $this->value;
    }

    public function getHas(){
        return $this->has;
    }

    public function getNotHas(){
        return $this->notHas;
    }

    public function getCustomWhere(){
        return $this->customWhere;
    }

    public function getCustomSort(){
        return $this->customSort;
    }

    public function setHas(string $has){
        $this->has = $has;
    }

    public function setNotHas(string $notHas){
        $this->notHas = $notHas;
    }

    public function setColumn(string $column){
        $this->column = $column;
    }

    public function setOperator(string $operator){
        $this->operator = $operator;
    }

    public function setValue($value){
        $this->value = $value;
    }

    public function setCustomWhere(Closure $customWhere){
        $this->customWhere = $customWhere;
    }

    public function setCustomSort(Closure $customSort){
        $this->customSort = $customSort;
    }

}
