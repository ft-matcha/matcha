class QueryBuilder {
    private query: string;
    private params: Array<string | { [key: string]: string | Number }>;
    private index: number;
    private table: string;

    constructor() {
        this.query = '';
        this.params = [];
        this.index = 0;
        this.table = '';
    }
    init() {
        this.query = '';
        this.params = [];
        this.index = 0;
        this.table = '';
        return this;
    }
    insert(table: string) {
        if (table === undefined) return this;
        this.query += 'INSERT INTO ' + table;
        this.table = this.table ? this.table : table;
        return this;
    }

    select(fields: string[], add?: string[]) {
        if (fields === undefined) return this;
        if (add) fields = fields.concat(add);
        this.query += 'SELECT ' + fields.join(', ');
        return this;
    }

    from(table?: string) {
        if (table === undefined) return this;
        this.query += ' FROM ' + table;
        this.table = this.table ? this.table : table;
        return this;
    }

    update(table: string) {
        if (table === undefined) return this;
        this.query += 'UPDATE ' + table;
        this.table = this.table ? this.table : table;
        return this;
    }

    delete(table: string) {
        if (table === undefined) return this;
        this.query += 'DELETE FROM ' + table;
        this.table = this.table ? this.table : table;
        return this;
    }

    where(conditions: any) {
        if (conditions === undefined) return this;
        const keys = Object.keys(conditions);
        let where: Boolean = false;
        this.query += ' WHERE ';
        this.query += keys
            .map((key) => {
                if (key === 'OR') return '';
                this.params.push(conditions[key]);
                where = true;
                return key + ' = ?';
            })
            .join(' AND ');
        if (conditions.OR !== undefined) {
            const or = conditions.OR;
            if (where === true) {
                this.query += ' AND (';
            }

            this.query += or
                .map((item: any) => {
                    const keys = Object.keys(item);
                    return keys
                        .map((key) => {
                            this.params.push(item[key]);
                            return key + ' = ?';
                        })
                        .join(' AND ');
                })
                .join(' OR ');
            where = true;
        }
        return this;
    }

    selectJoin(body: any) {
        if (body === undefined) return this;
        const { relation, data } = body;
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === 'object') {
                data[key] = JSON.stringify(data[key]);
            }
            if (data[key] === undefined) {
                delete data[key];
            }
        });
        const keys = Object.keys(data);
        const values = keys.map((key) => {
            this.params.push(data[key]);
            return '?';
        });
        const fk: string[] = [];
        const pk: string[] = [];
        const table: string[] = [];
        relation.map((item: any) => {
            table.push(item.table);
            fk.push(item.fk);
            pk.push(item.pk);
        });
        this.query += ` (${keys.join(', ')}, ${fk.join(', ')}) SELECT ${values.join(', ')}, ${pk
            .map((item: any, index: number) => {
                return `a${index}.${item}`;
            })
            .join(', ')} `;
        this.query += ` FROM ${table
            .map((item: any, index: number) => {
                return `${item} a${index}`;
            })
            .join(', ')}`;
        return this;
    }

    innerJoinSelect(data?: any) {
        if (data === undefined) return this;
        const alias = 'a' + this.index.toString();
        this.index++;
        const { table, fields, on } = data;
        this.query += ' INNER JOIN ';
        this.query += ' (SELECT ' + fields.join(', ') + ' FROM ' + table + ' GROUP BY ' + this.table + ') ';
        this.query += ' AS ' + alias;
        this.query += ' ON ';
        Object.keys(on).map((key, index) => {
            if (index !== 0) this.query += ' AND ';
            this.query += `${key} = ${on[key]}`;
        });
        return this;
    }

    join(data?: any) {
        if (data === undefined) return this;
        data.forEach((item: any) => {
            const alias = 'a' + this.index.toString();
            this.index++;
            this.query += ' LEFT JOIN ' + item.table + ` ${alias}` + ' ON ';
            Object.keys(item.on).map((key, index) => {
                if (index !== 0) this.query += ' AND ';
                this.query += `${key} = ${item.on[key]}`;
            });
        });
        return this;
    }

    include(data?: any) {
        if (data === undefined) return this;
        const { table, fk, pk } = data;
        const alias = 'a' + this.index.toString();
        this.index++;
        this.query += ` LEFT JOIN ${table} ${alias} ON ${alias}.${fk} = ${this.table}.${pk}`;
        return this;
    }

    set(data?: any) {
        if (data === undefined) return this;
        this.query += ' SET ? ';
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === 'object') {
                data[key] = JSON.stringify(data[key]);
            }
        });
        this.params.push(data);
        return this;
    }

    values(data: any) {
        const keys = Object.keys(data);
        const values = keys.map((key) => {
            this.params.push(data[key]);
            return '?';
        });
        this.query += ` (${keys.join(', ')}) VALUES (${values.join(', ')}) `;
        return this;
    }

    orderBy(field: string, order: string) {
        this.query += ' ORDER BY ' + field + ' ' + order;
        return this;
    }

    limit(limit: number) {
        this.query += ' LIMIT ' + limit;
        return this;
    }

    build() {
        return {
            query: this.query,
            params: this.params,
        };
    }
}

export default new QueryBuilder();
