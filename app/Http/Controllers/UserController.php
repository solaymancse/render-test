<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('Users', [
            'users' => $users,
        ]);
    }

    // Fetch all the resource
    protected function fetchAllResource($modelClass, $responseKey, $request, $relationships, $month = null, $year = null, $class = null, $subject = null, $batch = null)
    {
        $perPage = $request->input('per_page');
        $search = $request->query('search');
        $visibility = $request->query('visibility');
        $is_banned = $request->query('is_banned');
        $selectFields = $request->query('select');
        $relation = $request->query('relation');
        $orderBy = $request->query('order_by', 'created_at'); // Default sorting
        $orderDirection = $request->query('order_direction', 'desc'); // descending

        try {
            // Start query builder
            if ($relation === 'false') {
                $query = $modelClass::query();
            } else {
                $query = $modelClass::with($relationships);
            }

            if ($is_banned) {
                $query = $query->where("is_banned", $is_banned);
            }

            // Apply month and year filters if provided
            if ($month !== null && $year !== null) {
                $query->where('month', $month)->where('year', $year);
            } elseif ($month !== null || $year !== null) {
                return response()->json([
                    'status' => true,
                    $responseKey => "not matched",
                ], 200);
            }

            // Apply class, subject, and batch filters if provided
            if ($class) {
                $query->where('class_name_id', $class);
                if ($subject) {
                    $query->where('subject_id', $subject);
                }
                if ($batch) {
                    $query->where('batch_id', $batch);
                }
            }

            // Apply search filter if search parameter is provided
            if ($search && $modelClass) {
                $query->where(function ($q) use ($search, $modelClass, $relationships) {
                    $fillableColumns = (new $modelClass())->getFillable(); // Fetching fillable columns from the model instance
                    // $relations = (new $modelClass())->getRelations();

                    foreach ($fillableColumns as $column) {
                        $q->orWhere($column, 'LIKE', "%$search%");
                    }

                    foreach ($relationships as $relation) {
                        $relationModel = (new $modelClass())->{$relation}->getRelated();
                        $fillableColumns = $relationModel->getFillable();

                        foreach ($fillableColumns as $column) {
                            $q->orWhereHas($relation, function ($query) use ($search, $column) {
                                $query->where($column, 'LIKE', "%$search%");
                            });
                        }
                    }
                });
            }

            if ($visibility !== null) {
                $query->where('visibility', $visibility);
            }

            // Apply sorting
            $query->orderBy($orderBy, $orderDirection);

            if ($selectFields) {
                $selectFields = explode(',', $selectFields);
                if (!in_array('id', $selectFields)) {
                    $selectFields[] = 'id';
                }
                $query->select($selectFields);
            }

            // Apply pagination if per_page parameter is provided
            if ($perPage) {
                $data = $query->paginate($perPage);
            } else {
                $data = $query->get();
            }

            foreach ($data as $singleData) {
                if ($singleData->userInfo && $singleData->userInfo->roles) {
                    $role = $singleData->userInfo->roles[0]->name;
                    $singleData["role"] = $role;
                }
            }

            return response()->json([
                'status' => true,
                $responseKey => $data,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => "Error fetching {$responseKey} records.",
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
