from django.forms import ModelForm
from django import forms
from .models import Package, Profile
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class PackageForm(ModelForm):
    class Meta:
        model=Package
        fields='__all__'

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['role', 'phone']
        
class CreationForm(UserCreationForm):
    role = forms.ChoiceField(choices=Profile.ROLE, required=True)
    
    class Meta:
        model = User
        fields = ['role','username', 'password1', 'password2']
        
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.fields['username'].help_text = None
        self.fields['password1'].help_text = None
        self.fields['password2'].help_text = None
    