export class Map {
    constructor() {
        this.supported = false;
    }
    get image() {
        if (this.supported) {
            return 'https://api.code-it.ninja/api/files/afqsg1x4gsr2vs6/y0bob8awlnfiij7/8p_montargis_region_map_base_Eu55Dx2fPl.jpg';
        }
        return 'Not supported';
    }
}
