from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate, login
from django.conf import settings
from random import randint
from django.core.mail import send_mail
from .models import user,otp
from .serializers import userSerializer  

class RegistrationView(APIView):
    permission_classes = []
    def post(self, request):
        serializer = userSerializer(data=request.data)  
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class VerifyEmail(APIView):
    permission_classes = []
    def post(self, request, *args, **kwargs):
        otp_code=request.data['otp']
        email = request.data['email']
        found_otp=otp.objects.filter(email=email,code=otp_code).first()
        if found_otp is not None:
            searcheduser = user.objects.get(email=email)
            searcheduser.verified = True
            searcheduser.save()
            return Response({'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'OTP is invalid'}, status=status.HTTP_401_UNAUTHORIZED)
        
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        searcheduser = user.objects.get(id=id)
        if searcheduser is not None:
            otp_code=randint(100000,999999)
            otp.objects.filter(email=searcheduser.email).delete()
            otp.objects.create(email=searcheduser.email,code=otp_code)
            send_mail(
                "Verify Your Email: DataAnalytica",
                "Your OTP is "+str(otp_code)+"\n\nRegards,\nDataAnalytica Team",
                settings.EMAIL_HOST_USER,
                [searcheduser.email,],
                fail_silently=False,
            )
            return Response({'success':True,'email':searcheduser.email},status=status.HTTP_200_OK)
        else:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)




class GetToken(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        email = request.data['email']
        password = request.data['password']
        response = super(GetToken, self).post(request, *args, **kwargs)
        authuser = authenticate(request, email=email, password=password)
        if authuser is not None:
            login(request, authuser)
            if response.status_code == status.HTTP_200_OK:
                searcheduser = user.objects.get(email=request.data['email'])
                return Response({
                    'access': response.data['access'],
                    'refresh': response.data['refresh'],
                    'user_id': searcheduser.id,
                    'verification': searcheduser.verified,                
                })
            return response
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        