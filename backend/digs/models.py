from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save


class Digs(models.Model):
    name = models.CharField(max_length=64, unique=True)
    

class DigsMember(AbstractUser):
    digs = models.ForeignKey(Digs,related_name='digs',on_delete=models.CASCADE,blank=True, null=True)
    username = models.CharField(max_length=30, unique=False)
    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

DigsMember._meta.get_field('email')._unique=True
DigsMember._meta.get_field('username')._unique=False




class Expenses(models.Model):
    CATEGORIES = [ 
        ('U', 'UTILITIES'),
        ('H', 'HOUSEHOLD ITEMS'),
        ('F', 'FOOD'),
        ('T','TRANSPORT'),
         ('E', 'ENTERTAINMENT'),
         ('B', 'BOOZE'),
         ('L', 'LOAN SHARK'),
    ]
    created = models.DateTimeField(auto_now_add=True)
    amount = models.BigIntegerField()
    name = models.CharField(max_length=60)
    category = models.CharField(max_length=1, choices=CATEGORIES) 
    members_owing = models.ManyToManyField(DigsMember,blank=True,related_name='expenseOwner')
    owner = models.ForeignKey(
       settings.AUTH_USER_MODEL, related_name='expenses', on_delete=models.CASCADE,null=True)
    digs=models.ForeignKey(Digs,related_name='digsExpense',on_delete=models.CASCADE,blank=True,null=True)
    class Meta:
        ordering = ('created',)


class Invite(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=254)
    inviter = models.ForeignKey(
       settings.AUTH_USER_MODEL, related_name='inviter', on_delete=models.CASCADE,null=True)
    message = models.TextField()

    def __str__(self):
        return self.name