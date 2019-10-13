json server can support us with api/data mocking and supporting all HTTP verbs (get, post, put, delete), also it support nested entities
and entities relations (one to one, one to many)
    - run command "npm run serve:mock".
    - it will generate data.json on mocks folder which will contains the all the mocked data.
    - now let's generate data it self, and keep the code for generating data on mock-config.js, so we other developer on the same project
        share the same mock data specification.
    - we are using https://danibram.github.io/mocker-data-generator/ for data generation.
    - EXAMPLE

    var role = {
            id: {
                chance: 'guid'
            },
            name: {
                randexp: /app_(user|administrator|superUser)/
            },
            description: {
              faker: 'lorem.paragraph'
            }
        };

    var user = {
            id: {
                chance: 'guid'
            },
            name: {
                faker: 'name.findName'
            },
            email: {
                faker: 'internet.email'
            },
            age: {
                faker: 'random.number({"min": 1, "max": 17})'
            },
            country: {
                casual: 'country'
            },
            role: {
                hasOne: 'roles',
                get: 'id',
            }
        };

        mocker()
            .schema('roles', role, 3)
            .schema('users', user, 20)

            so know copy the above model spec to https://danibram.github.io/mocker-data-generator/ and take the result on data.json file and
            you will have Rest API that support CRUD operations on both models and also will support nested entities like user/[id]/role
            