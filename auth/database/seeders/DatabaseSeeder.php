<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        /* 
            'HR1 Admin',
            'HR2 Admin', 'Trainer', 'Employee',
            'HR3 Admin',
            'HR4 Admin',
            'Payroll Specialist',
            'LogisticsI Admin', 'Manager', 'Staff',
            'Fleet Manager', 'Driver',
            'Facility Admin', 'Legal Admin', 'Front Desk Admin', 'Super Admin'
        */
        User::factory()->create([
            'name'      => 'Ceniza Rei',
            'uuid'      => Str::uuid(),
            'email'     => 'ceniza082804@gmail.com',
            'password'  => '123456',
            'role'      => 'HR1 Admin',
        ]);

        User::factory()->create([
            'name'      => 'John Reyes',
            'uuid'      => Str::uuid(),
            'email'     => 'hr2admin@gmail.com',
            'password'  => '123456',
            'role'      => 'HR2 Admin',
        ]);

        User::factory()->create([
            'name'      => 'Anna Dela Cruz',
            'uuid'      => Str::uuid(),
            'email'     => 'trainer@gmail.com',
            'password'  => '123456',
            'role'      => 'Trainer',
        ]);

        User::factory()->create([
            'name'      => 'Mark Lim',
            'uuid'      => Str::uuid(),
            'email'     => 'employee@gmail.com',
            'password'  => '123456',
            'role'      => 'Employee',
        ]);

        User::factory()->create([
            'name'      => 'Pauline Garcia',
            'uuid'      => Str::uuid(),
            'email'     => 'hr3admin@gmail.com',
            'password'  => '123456',
            'role'      => 'HR3 Admin',
        ]);

        User::factory()->create([
            'name'      => 'Ferdinand Tanilon',
            'uuid'      => Str::uuid(),
            'email'     => 'ferdinandtanilon01@gmail.com',
            'password'  => '123456',
            'role'      => 'HR4 Admin',
        ]);

        User::factory()->create([
            'name'      => 'Sofia Ramos',
            'uuid'      => Str::uuid(),
            'email'     => 'payrollspecialist@gmail.com',
            'password'  => '123456',
            'role'      => 'Payroll Specialist',
        ]);

        User::factory()->create([
            'name'      => 'James Tan',
            'uuid'      => Str::uuid(),
            'email'     => 'manager@gmail.com',
            'password'  => '123456',
            'role'      => 'Manager',
        ]);

        User::factory()->create([
            'name'      => 'Liza Bautista',
            'uuid'      => Str::uuid(),
            'email'     => 'staff@gmail.com',
            'password'  => '123456',
            'role'      => 'Staff',
        ]);

        User::factory()->create([
            'name'      => 'Miguel Torres',
            'uuid'      => Str::uuid(),
            'email'     => 'facilityadmin@gmail.com',
            'password'  => '123456',
            'role'      => 'Facility Admin',
        ]);

        User::factory()->create([
            'name'      => 'Patricia Cruz',
            'uuid'      => Str::uuid(),
            'email'     => 'legaladmin@gmail.com',
            'password'  => '123456',
            'role'      => 'Legal Admin',
        ]);

        User::factory()->create([
            'name'      => 'Erika Villanueva',
            'uuid'      => Str::uuid(),
            'email'     => 'frontdeskadmin@gmail.com',
            'password'  => '123456',
            'role'      => 'Front Desk Admin',
        ]);

        User::factory()->create([
            'name'      => 'Patrick',
            'uuid'      => Str::uuid(),
            'email'     => 'patrickpernito1@gmail.com',
            'password'  => '123456',
            'role'      => 'Super Admin',
        ]);

        User::factory()->create([
            'name'      => 'Fleet Manager',
            'uuid'      => Str::uuid(),
            'email'     => 'fleetManager@gmail.com',
            'password'  => '123456',
            'role'      => 'Fleet Manager',
        ]);

        User::factory()->create([
            'name'      => 'Christian',
            'uuid'      => Str::uuid(),
            'email'     => 'loquezchristian@gmail.com',
            'password'  => '123456',
            'role'      => 'Fleet Manager',
        ]);

        User::factory()->create([
            'name'      => 'Jamiee',
            'uuid'      => Str::uuid(),
            'email'     => 'jamieeroque20@gmail.com',
            'password'  => '123456',
            'role'      => 'Fleet Manager',
        ]);

        User::factory()->create([
            'name'      => 'Christian',
            'uuid'      => Str::uuid(),
            'email'     => 'clarkkenthagulo24@gmail.com',
            'password'  => '123456',
            'role'      => 'Fleet Manager',
        ]);

        User::factory()->create([
            'name'      => 'Adriane',
            'uuid'      => Str::uuid(),
            'email'     => 'adrianea.paracale@gmail.com',
            'password'  => '123456',
            'role'      => 'Fleet Manager',
        ]);

        User::factory()->create([
            'name'      => 'Shaine',
            'uuid'      => Str::uuid(),
            'email'     => 'pausanoss@gmail.com',
            'password'  => '123456',
            'role'      => 'Fleet Manager',
        ]);

        User::factory()->create([
            'name'      => 'Driver Pipito',
            'uuid'      => Str::uuid(),
            'email'     => 'driver@gmail.com',
            'password'  => '123456',
            'role'      => 'Driver',
        ]);

        User::factory()->create([
            'name'      => 'Rence Calo', 
            'uuid'      => Str::uuid(),
            'email'     => 'ecnerualolac@gmail.com',
            'password'  => '123456',
            'role'      => 'LogisticsI Admin',
        ]);

        User::factory()->create([
            'name'      => 'Ramos Mark', 
            'uuid'      => Str::uuid(),
            'email'     => 'ramosmark1998@gmail.com',
            'password'  => '123456',
            'role'      => 'LogisticsI Admin',
        ]);
        
    }
}
