import { Home, GamesWithFilter } from "./../models/game";

export const HOME_API: Home = {
    on_sales: [
        {
            id: 1,
            name: "Call of Duty®: Modern Warfare® - Digital Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.50528.68332208580498659.9222b095-8101-4531-b386-33547ee9944f.948f2c50-2f29-43df-9557-4670f69840d1",
            price: 1105,
        },
        {
            id: 2,
            name: "Minecraft",
            image: "https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4",
            price: 799,
        },
        {
            id: 3,
            name: "Tom Clancy’s Ghost Recon® Wildlands - Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.16447.65577870102127192.24a0a154-ded1-4a40-a91f-102019aaee70.9315ae41-3fbe-4f1f-a91b-5049d566842f",
            price: 2540,
        },
        {
            id: 4,
            name: "It Takes Two - Digital Version",
            image: "https://store-images.s-microsoft.com/image/apps.1758.14488339386131194.84ca8b8a-582e-4d34-904e-8f1e60f71000.21ae50f4-b3e8-491b-b7f9-a78676a40b42",
            price: 1990,
        },
        {
            id: 5,
            name: "SUPER STREETFIGHTER IV ARCADE EDITION",
            image: "https://store-images.s-microsoft.com/image/apps.32806.69348165562119927.08cc694a-5f8d-47e5-b7fb-204c8faff4af.40e77514-9ef8-40fc-9298-ff5a13833a4b",
            price: 890,
        },
        {
            id: 6,
            name: "Tiny Tina's Wonderlands: Chaotic Great Edition",
            image: "https://store-images.s-microsoft.com/image/apps.7096.14023020573568791.2e6c1fa8-9ac2-4618-a2e6-b411278881a1.14026382-2730-4e69-8ae0-8139f9ca8f79",
            price: 3590,
        },
    ],
    most_populars: [
        {
            id: 1,
            name: "Call of Duty®: Modern Warfare® - Digital Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.50528.68332208580498659.9222b095-8101-4531-b386-33547ee9944f.948f2c50-2f29-43df-9557-4670f69840d1",
            price: 1105,
        },
        {
            id: 2,
            name: "Minecraft",
            image: "https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4",
            price: 799,
        },
        {
            id: 3,
            name: "Tom Clancy’s Ghost Recon® Wildlands - Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.16447.65577870102127192.24a0a154-ded1-4a40-a91f-102019aaee70.9315ae41-3fbe-4f1f-a91b-5049d566842f",
            price: 2540,
        },
        {
            id: 4,
            name: "It Takes Two - Digital Version",
            image: "https://store-images.s-microsoft.com/image/apps.1758.14488339386131194.84ca8b8a-582e-4d34-904e-8f1e60f71000.21ae50f4-b3e8-491b-b7f9-a78676a40b42",
            price: 1990,
        },
        {
            id: 5,
            name: "SUPER STREETFIGHTER IV ARCADE EDITION",
            image: "https://store-images.s-microsoft.com/image/apps.32806.69348165562119927.08cc694a-5f8d-47e5-b7fb-204c8faff4af.40e77514-9ef8-40fc-9298-ff5a13833a4b",
            price: 890,
        },
        {
            id: 6,
            name: "Tiny Tina's Wonderlands: Chaotic Great Edition",
            image: "https://store-images.s-microsoft.com/image/apps.7096.14023020573568791.2e6c1fa8-9ac2-4618-a2e6-b411278881a1.14026382-2730-4e69-8ae0-8139f9ca8f79",
            price: 3590,
        },
    ],
    new_releases: [
        {
            id: 1,
            name: "Call of Duty®: Modern Warfare® - Digital Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.50528.68332208580498659.9222b095-8101-4531-b386-33547ee9944f.948f2c50-2f29-43df-9557-4670f69840d1",
            price: 1105,
        },
        {
            id: 2,
            name: "Minecraft",
            image: "https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4",
            price: 799,
        },
        {
            id: 3,
            name: "Tom Clancy’s Ghost Recon® Wildlands - Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.16447.65577870102127192.24a0a154-ded1-4a40-a91f-102019aaee70.9315ae41-3fbe-4f1f-a91b-5049d566842f",
            price: 2540,
        },
        {
            id: 4,
            name: "It Takes Two - Digital Version",
            image: "https://store-images.s-microsoft.com/image/apps.1758.14488339386131194.84ca8b8a-582e-4d34-904e-8f1e60f71000.21ae50f4-b3e8-491b-b7f9-a78676a40b42",
            price: 1990,
        },
        {
            id: 5,
            name: "SUPER STREETFIGHTER IV ARCADE EDITION",
            image: "https://store-images.s-microsoft.com/image/apps.32806.69348165562119927.08cc694a-5f8d-47e5-b7fb-204c8faff4af.40e77514-9ef8-40fc-9298-ff5a13833a4b",
            price: 890,
        },
        {
            id: 6,
            name: "Tiny Tina's Wonderlands: Chaotic Great Edition",
            image: "https://store-images.s-microsoft.com/image/apps.7096.14023020573568791.2e6c1fa8-9ac2-4618-a2e6-b411278881a1.14026382-2730-4e69-8ae0-8139f9ca8f79",
            price: 3590,
        },
    ],
    comming_soons: [
        {
            id: 1,
            name: "Call of Duty®: Modern Warfare® - Digital Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.50528.68332208580498659.9222b095-8101-4531-b386-33547ee9944f.948f2c50-2f29-43df-9557-4670f69840d1",
            price: 1105,
        },
        {
            id: 2,
            name: "Minecraft",
            image: "https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4",
            price: 799,
        },
        {
            id: 3,
            name: "Tom Clancy’s Ghost Recon® Wildlands - Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.16447.65577870102127192.24a0a154-ded1-4a40-a91f-102019aaee70.9315ae41-3fbe-4f1f-a91b-5049d566842f",
            price: 2540,
        },
        {
            id: 4,
            name: "It Takes Two - Digital Version",
            image: "https://store-images.s-microsoft.com/image/apps.1758.14488339386131194.84ca8b8a-582e-4d34-904e-8f1e60f71000.21ae50f4-b3e8-491b-b7f9-a78676a40b42",
            price: 1990,
        },
        {
            id: 5,
            name: "SUPER STREETFIGHTER IV ARCADE EDITION",
            image: "https://store-images.s-microsoft.com/image/apps.32806.69348165562119927.08cc694a-5f8d-47e5-b7fb-204c8faff4af.40e77514-9ef8-40fc-9298-ff5a13833a4b",
            price: 890,
        },
        {
            id: 6,
            name: "Tiny Tina's Wonderlands: Chaotic Great Edition",
            image: "https://store-images.s-microsoft.com/image/apps.7096.14023020573568791.2e6c1fa8-9ac2-4618-a2e6-b411278881a1.14026382-2730-4e69-8ae0-8139f9ca8f79",
            price: 3590,
        },
    ],
};

export const GAME_WITH_FILTER: GamesWithFilter = {
    title: "Category Name",
    page: 1,
    total_page: 10,
    sorting_id: 1,
    games: [
        {
            id: 1,
            name: "Call of Duty®: Modern Warfare® - Digital Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.50528.68332208580498659.9222b095-8101-4531-b386-33547ee9944f.948f2c50-2f29-43df-9557-4670f69840d1",
            price: 1105,
        },
        {
            id: 2,
            name: "Minecraft",
            image: "https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4",
            price: 799,
        },
        {
            id: 3,
            name: "Tom Clancy’s Ghost Recon® Wildlands - Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.16447.65577870102127192.24a0a154-ded1-4a40-a91f-102019aaee70.9315ae41-3fbe-4f1f-a91b-5049d566842f",
            price: 2540,
        },
        {
            id: 4,
            name: "It Takes Two - Digital Version",
            image: "https://store-images.s-microsoft.com/image/apps.1758.14488339386131194.84ca8b8a-582e-4d34-904e-8f1e60f71000.21ae50f4-b3e8-491b-b7f9-a78676a40b42",
            price: 1990,
        },
        {
            id: 5,
            name: "SUPER STREETFIGHTER IV ARCADE EDITION",
            image: "https://store-images.s-microsoft.com/image/apps.32806.69348165562119927.08cc694a-5f8d-47e5-b7fb-204c8faff4af.40e77514-9ef8-40fc-9298-ff5a13833a4b",
            price: 890,
        },
        {
            id: 6,
            name: "Tiny Tina's Wonderlands: Chaotic Great Edition",
            image: "https://store-images.s-microsoft.com/image/apps.7096.14023020573568791.2e6c1fa8-9ac2-4618-a2e6-b411278881a1.14026382-2730-4e69-8ae0-8139f9ca8f79",
            price: 3590,
        },
        {
            id: 7,
            name: "Call of Duty®: Modern Warfare® - Digital Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.50528.68332208580498659.9222b095-8101-4531-b386-33547ee9944f.948f2c50-2f29-43df-9557-4670f69840d1",
            price: 1105,
        },
        {
            id: 8,
            name: "Minecraft",
            image: "https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4",
            price: 799,
        },
        {
            id: 9,
            name: "Tom Clancy’s Ghost Recon® Wildlands - Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.16447.65577870102127192.24a0a154-ded1-4a40-a91f-102019aaee70.9315ae41-3fbe-4f1f-a91b-5049d566842f",
            price: 2540,
        },
        {
            id: 10,
            name: "It Takes Two - Digital Version",
            image: "https://store-images.s-microsoft.com/image/apps.1758.14488339386131194.84ca8b8a-582e-4d34-904e-8f1e60f71000.21ae50f4-b3e8-491b-b7f9-a78676a40b42",
            price: 1990,
        },
        {
            id: 11,
            name: "SUPER STREETFIGHTER IV ARCADE EDITION",
            image: "https://store-images.s-microsoft.com/image/apps.32806.69348165562119927.08cc694a-5f8d-47e5-b7fb-204c8faff4af.40e77514-9ef8-40fc-9298-ff5a13833a4b",
            price: 890,
        },
        {
            id: 12,
            name: "Tiny Tina's Wonderlands: Chaotic Great Edition",
            image: "https://store-images.s-microsoft.com/image/apps.7096.14023020573568791.2e6c1fa8-9ac2-4618-a2e6-b411278881a1.14026382-2730-4e69-8ae0-8139f9ca8f79",
            price: 3590,
        },
        {
            id: 13,
            name: "Call of Duty®: Modern Warfare® - Digital Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.50528.68332208580498659.9222b095-8101-4531-b386-33547ee9944f.948f2c50-2f29-43df-9557-4670f69840d1",
            price: 1105,
        },
        {
            id: 14,
            name: "Minecraft",
            image: "https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4",
            price: 799,
        },
        {
            id: 15,
            name: "Tom Clancy’s Ghost Recon® Wildlands - Standard Edition",
            image: "https://store-images.s-microsoft.com/image/apps.16447.65577870102127192.24a0a154-ded1-4a40-a91f-102019aaee70.9315ae41-3fbe-4f1f-a91b-5049d566842f",
            price: 2540,
        },
        {
            id: 16,
            name: "It Takes Two - Digital Version",
            image: "https://store-images.s-microsoft.com/image/apps.1758.14488339386131194.84ca8b8a-582e-4d34-904e-8f1e60f71000.21ae50f4-b3e8-491b-b7f9-a78676a40b42",
            price: 1990,
        },
        {
            id: 17,
            name: "SUPER STREETFIGHTER IV ARCADE EDITION",
            image: "https://store-images.s-microsoft.com/image/apps.32806.69348165562119927.08cc694a-5f8d-47e5-b7fb-204c8faff4af.40e77514-9ef8-40fc-9298-ff5a13833a4b",
            price: 890,
        },
        {
            id: 18,
            name: "Tiny Tina's Wonderlands: Chaotic Great Edition",
            image: "https://store-images.s-microsoft.com/image/apps.7096.14023020573568791.2e6c1fa8-9ac2-4618-a2e6-b411278881a1.14026382-2730-4e69-8ae0-8139f9ca8f79",
            price: 3590,
        },
    ],
    filter: [
        {
            id: 1,
            name: 'Game type',
            slug: 'game-type',
            options: [
                {
                    id: 1,
                    name: 'Action',
                    slug: 'action',
                    selected: false
                },
                {
                    id: 2,
                    name: 'Driving/Racing',
                    slug: 'driving-racing',
                    selected: false
                }
            ]
        },
        {
            id: 2,
            name: 'Price',
            slug: 'price',
            options: [
                {
                    id: 1,
                    name: 'Free',
                    slug: '0',
                    selected: false
                },
                {
                    id: 2,
                    name: 'Under THB 199',
                    slug: '0-199',
                    selected: false
                },
                {
                    id: 3,
                    name: 'THB 200 - 399',
                    slug: '200-399',
                    selected: false
                }
            ]
        },
        {
            id: 3,
            name: 'Platform',
            slug: 'platform',
            options: [
                {
                    id: 1,
                    name: 'PlayStation',
                    slug: 'ps',
                    selected: false
                },
                {
                    id: 2,
                    name: 'Xbox',
                    slug: 'xbox',
                    selected: false
                },
                {
                    id: 3,
                    name: 'Nintendo',
                    slug: 'nintendo',
                    selected: false
                }
            ]
        }
    ],
};
