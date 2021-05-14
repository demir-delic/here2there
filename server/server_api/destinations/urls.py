from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"cities", views.CityViewSet)
router.register(r"nearest-city", views.NearestCityViewSet)
router.register(r"recommended-cities", views.RecommendedCitiesViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
