"""
URL configuration for tena360 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from apps.dashboard import DashboardView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("apps.authentication.urls")),
    path("api/profile", include("apps.profiles.urls")),
    path("api/", include("apps.nutrition.urls")),
    path("api/", include("apps.stress.urls")),
    path("api/", include("apps.chatbot.urls")),
    path("api/dashboard", DashboardView.as_view(), name="dashboard"),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
