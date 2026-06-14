from django.urls import path

from .views import StressAssessmentView

urlpatterns = [path("stress", StressAssessmentView.as_view(), name="stress")]
