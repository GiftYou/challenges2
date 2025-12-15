
function createDataStore() {
  const data = [];
  const indexById = {};

  return {
    // CREATE
    insert(record) {
      data.push(record);
      indexById[record.id] = record;
    },

    // READ (query sederhana)
    find(query) {
      const results = [];

      for (let i = 0; i < data.length; i++) {
        let match = true;

        for (let key in query) {
          if (data[i][key] !== query[key]) {
            match = false;
            break;
          }
        }

        if (match) {
          results.push(data[i]);
        }
      }

      return results;
    },

    // UPDATE (by id)
    update(id, updates) {
      const record = indexById[id];

      if (!record) {
        return { success: false, message: "Record not found" };
      }

      for (let key in updates) {
        record[key] = updates[key];
      }

      return {
        success: true,
        updated: record
      };
    },

    // DELETE (optional, tapi bagian CRUD)
    remove(id) {
      if (!indexById[id]) return false;

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data.splice(i, 1);
          break;
        }
      }

      delete indexById[id];
      return true;
    },

    // STATS & AGGREGATION
    getStats() {
      let totalSalary = 0;
      let minSalary = Infinity;
      let maxSalary = -Infinity;
      let departmentsSet = {};

      for (let i = 0; i < data.length; i++) {
        const { salary, department } = data[i];

        totalSalary += salary;
        minSalary = Math.min(minSalary, salary);
        maxSalary = Math.max(maxSalary, salary);
        departmentsSet[department] = true;
      }

      const departments = Object.keys(departmentsSet);

      return {
        totalRecords: data.length,
        departments: departments,
        averageSalary: data.length ? totalSalary / data.length : 0,
        salaryRange: {
          min: minSalary,
          max: maxSalary
        }
      };
    }
  };
}


// Tulis function createDataStore di sini

let store = createDataStore();
store.insert({ id: 1, name: "Alice", department: "IT", salary: 5000 });
store.insert({ id: 2, name: "Bob", department: "HR", salary: 4500 });
store.insert({ id: 3, name: "Charlie", department: "IT", salary: 5500 });

console.log(store.find({ department: "IT" }));
console.log(store.update(2, { salary: 4800 }));
console.log(store.getStats());