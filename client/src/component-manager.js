

class ComponentManager {
    components = {};

    register = (thisRef, alias) => {
        this.components[alias] = thisRef;
    }

    do = (callback) => callback(this.components);
}

export default new ComponentManager();