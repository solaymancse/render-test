<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Notifications\CategoryCreateNotification;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->unreadnotifications;

        return Inertia::render('Notifications/Notifications', [
            'notifications' => $notifications
        ]);
    }

    public function markAsRead($id)
    {
        if ($id) {
            auth()->user()->notifications->where('id', $id)->markAsRead();
        }

        return back();
    }
}
