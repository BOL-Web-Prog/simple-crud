<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function showProduct(Request $request) {
      $query = Product::orderBy($request->column, $request->order);
      $product = $query->paginate($request->per_page ?? 5);
      return ProductResource::collection($product);
    }

    public function storeProduct(Request $request)
    {
        $request->validate([
            'productName' => 'required|string|max:255',
            'productDescription' => 'required',
            'productBasePrice' => 'required',
            'productSellingPrice' => 'required',
            'productImages' => 'required|file|image|mimes:jpeg,png,jpg'
        ]);

        $product_image = $request->file('productImages');
        $nama_foto = time()."_".$product_image->getClientOriginalName();
        $tujuan_upload_foto = 'product_images';
		$product_image->move($tujuan_upload_foto,$nama_foto);

        $product = new Product;
        $product->productName = $request['productName'];
        $product->productDescription = $request['productDescription'];
        $product->productBasePrice = $request['productBasePrice'];
        $product->productSellingPrice = $request['productSellingPrice'];
        $product->productImages = $nama_foto;
        $product->save();

      return response()->json([
        'status' => '00',
        'message' => 'success'
      ]);

    }
    

    public function updateProduct(Request $request) {

      $product = Product::find($request->id);

      $product->productName = $request['productName'];
      $product->productDescription = $request['productDescription'];
      $product->productBasePrice = $request['productBasePrice'];
      $product->productSellingPrice = $request['productSellingPrice'];
      $product->productImages = $request['productImages'];
      $product->save();

      return response()->json([
        'status' => '00',
        'message' => 'success'
      ]);
    }

    public function deleteProduct($id) {
      $product = Product::find($id);
      $product->delete();
      return response()->json([
        'status' => '00',
        'message' => 'success'
      ]);
    }
}
