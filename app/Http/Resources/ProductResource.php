<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
      return [
        'id'        =>  $this->id,
        'productName'       => $this->productName,
        'productDescription'      => $this->productDescription,
        'productBasePrice' => $this->productBasePrice,
        'productSellingPrice' => $this->productSellingPrice,
        'productImages' => $this->productImages
      ];
    }
}
