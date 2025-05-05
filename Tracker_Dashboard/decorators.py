from django.core.exceptions import PermissionDenied

def student_required(view_func):
    """
    Only allow access if the logged-in user has role == 'student'
    """
    def _wrapped(request, *args, **kwargs):
        if getattr(request.user, 'role', None) == 'student':
            return view_func(request, *args, **kwargs)
        raise PermissionDenied
    return _wrapped

def supervisor_required(view_func):
    """
    Only allow access if the logged-in user has role == 'supervisor'
    """
    def _wrapped(request, *args, **kwargs):
        if getattr(request.user, 'role', None) == 'supervisor':
            return view_func(request, *args, **kwargs)
        raise PermissionDenied
    return _wrapped
