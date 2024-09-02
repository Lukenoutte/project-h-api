import { IKeyCaseHelper } from "./@interfaces/helper.interfaces";

export default class KeyCaseHelper implements IKeyCaseHelper{
    snakeCaseToCamelCase(data: any): any {
        if (Array.isArray(data)) return data.map(this.snakeCaseToCamelCase);
        if (this.#isObject(data)) return this.#convertObjectKeysToCamelCase(data);
        return data;
    }
        
    #isObject(value: any): boolean {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }
    
    #convertObjectKeysToCamelCase(obj: Record<string, any>): Record<string, any> {
        const newObj: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
            const camelKey = this.#convertToCamelCase(key);
            newObj[camelKey] = this.snakeCaseToCamelCase(value);
        }
        return newObj;
    }
    
    #convertToCamelCase(str: string): string {
        return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }
}
