<?php

namespace App\Http\Controllers;

use App\Events\NotificationCreated;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\User;
use App\Notifications\CategoryCreateNotification;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query("search");
        $direction = $request->query("direction", "desc");
        $perPage = $request->query("perPage", 5);

        $query = Category::query();

        $query = $query->where('soft_delete', false);

        if ($search) {
            $query->where(function ($query) use ($search) {
                // $columns = Schema::getColumnListing('categories');
                $columns = (new Category())->getFillable();
                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search . '%');
                }
            });
        }

        if ($direction === 'desc') {
            $query = $query->latest();
        }

        $categories = $query->paginate($perPage);

        return Inertia::render('Categories/Categories', [
            'categories' => $categories
        ]);
    }

    public function trashIndex(Request $request)
    {
        $search = $request->query("search");
        $direction = $request->query("direction", "desc");
        $perPage = $request->query("perPage", 5);

        $query = Category::query();

        $query = $query->where('soft_delete', true);

        if ($search) {
            $query->where(function ($query) use ($search) {
                $columns = (new Category())->getFillable();
                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search . '%');
                }
            });
        }

        if ($direction === 'desc') {
            $query = $query->latest();
        }

        $trashCategories = $query->paginate($perPage);

        return Inertia::render('Categories/TrashCategories', [
            'trashCategories' => $trashCategories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/AddCategory');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $validatedData = $request->validated();

        $category = Category::create($validatedData);

        $users = User::where('id', '!=', auth()->user()->id)->get();
        foreach ($users as $user) {
            $user->notify(new CategoryCreateNotification($category));
            $latestNotification = $user->notifications()->latest()->first();

            event(new NotificationCreated($user, $latestNotification));
        }

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $category = Category::find($id);

        return Inertia::render('Categories/EditCategory', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, $id)
    {
        $category = Category::find($id);
        $validatedData = $request->validated();

        $category->update($validatedData);

        return back();
    }

    public function softDelete($id)
    {
        $category = Category::find($id);

        $category->update([
            'soft_delete' => $category->soft_delete ? false : true,
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Category::find($id)->delete();
    }
}
