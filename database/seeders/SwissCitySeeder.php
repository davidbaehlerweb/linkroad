<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SwissCity;

class SwissCitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cities = [
            ['name' => 'Aarau', 'canton' => 'Argovie'],
            ['name' => 'Aarberg', 'canton' => 'Berne'],
            ['name' => 'Aarburg', 'canton' => 'Argovie'],
            ['name' => 'Agno', 'canton' => 'Tessin'],
            ['name' => 'Aigle', 'canton' => 'Vaud'],
            ['name' => 'Allschwil', 'canton' => 'Bâle-Campagne'],
            ['name' => 'Altstätten', 'canton' => 'Saint-Gall'],
            ['name' => 'Amriswil', 'canton' => 'Thurgovie'],
            ['name' => 'Appenzell', 'canton' => 'Appenzell Rhodes-Intérieures'],
            ['name' => 'Arbon', 'canton' => 'Thurgovie'],
            ['name' => 'Ascona', 'canton' => 'Tessin'],
            ['name' => 'Aubonne', 'canton' => 'Vaud'],
            ['name' => 'Avenches', 'canton' => 'Vaud'],
            ['name' => 'Baden', 'canton' => 'Argovie'],
            ['name' => 'Bâle', 'canton' => 'Bâle-Ville'],
            ['name' => 'Bellinzone', 'canton' => 'Tessin'],
            ['name' => 'Berne', 'canton' => 'Berne'],
            ['name' => 'Bienne', 'canton' => 'Berne'],
            ['name' => 'Binningen', 'canton' => 'Bâle-Campagne'],
            ['name' => 'Brigue-Glis', 'canton' => 'Valais'],
            ['name' => 'Bulle', 'canton' => 'Fribourg'],
            ['name' => 'Carouge', 'canton' => 'Genève'],
            ['name' => 'Chiasso', 'canton' => 'Tessin'],
            ['name' => 'Coire', 'canton' => 'Grisons'],
            ['name' => 'Conthey', 'canton' => 'Valais'],
            ['name' => 'Crans-Montana', 'canton' => 'Valais'],
            ['name' => 'Davos', 'canton' => 'Grisons'],
            ['name' => 'Delémont', 'canton' => 'Jura'],
            ['name' => 'Dietikon', 'canton' => 'Zurich'],
            ['name' => 'Dübendorf', 'canton' => 'Zurich'],
            ['name' => 'Ecublens', 'canton' => 'Vaud'],
            ['name' => 'Emmen', 'canton' => 'Lucerne'],
            ['name' => 'Frauenfeld', 'canton' => 'Thurgovie'],
            ['name' => 'Fribourg', 'canton' => 'Fribourg'],
            ['name' => 'Genève', 'canton' => 'Genève'],
            ['name' => 'Gland', 'canton' => 'Vaud'],
            ['name' => 'Herisau', 'canton' => 'Appenzell Rhodes-Extérieures'],
            ['name' => 'Interlaken', 'canton' => 'Berne'],
            ['name' => 'Kloten', 'canton' => 'Zurich'],
            ['name' => 'La Chaux-de-Fonds', 'canton' => 'Neuchâtel'],
            ['name' => 'Lausanne', 'canton' => 'Vaud'],
            ['name' => 'Locarno', 'canton' => 'Tessin'],
            ['name' => 'Lucerne', 'canton' => 'Lucerne'],
            ['name' => 'Lugano', 'canton' => 'Tessin'],
            ['name' => 'Martigny', 'canton' => 'Valais'],
            ['name' => 'Montreux', 'canton' => 'Vaud'],
            ['name' => 'Neuchâtel', 'canton' => 'Neuchâtel'],
            ['name' => 'Nyon', 'canton' => 'Vaud'],
            ['name' => 'Olten', 'canton' => 'Soleure'],
            ['name' => 'Prilly', 'canton' => 'Vaud'],
            ['name' => 'Rolle', 'canton' => 'Vaud'],
            ['name' => 'Sion', 'canton' => 'Valais'],
            ['name' => 'Thoune', 'canton' => 'Berne'],
            ['name' => 'Vevey', 'canton' => 'Vaud'],
            ['name' => 'Winterthour', 'canton' => 'Zurich'],
            ['name' => 'Zermatt', 'canton' => 'Valais'],
            ['name' => 'Zurich', 'canton' => 'Zurich'],
        ];

        foreach ($cities as $city) {
            SwissCity::create($city);
        }
    }
}
