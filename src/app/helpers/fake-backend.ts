import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktoYWxlZCBIYW16aSIsImFkbWluIjp0cnVlfQ.kLJ-qtk7uRENYOdUbTnkZePXeho3rnGoUoxzjF8maco';

    backend.connections.subscribe((connection: MockConnection) => {
        // Fake implementation of /api/authenticate
        if (connection.request.url.endsWith('/api/authenticate') &&
            connection.request.method === RequestMethod.Post) {
            let body = JSON.parse(connection.request.getBody());

            if (body.email === 'admin@domain.com' && body.password === 'password') {
              connection.mockRespond(new Response(
                new ResponseOptions({
                  status: 200,
                  body: { token: token }
                })
              ));
            } else {
              connection.mockRespond(new Response(
                new ResponseOptions({ status: 200 })
              ));
            }
        }

        // Fake implementation of /api/products
        if (connection.request.url.endsWith('/api/products') && connection.request.method === RequestMethod.Get) {
            if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                connection.mockRespond(new Response(
                  new ResponseOptions({
                    status: 200, body: [
                      {
                        "id": 1,
                        "name": "Small Concrete Mouse",
                        "description": "Amet ipsam magni in consequatur quo. Ea tempora ratione aliquid voluptatem dolores ullam quod ut tempore. Accusantium non sed harum aut et vel voluptatem rerum et.",
                        "price": "772.00",
                        "imageUrl": "https://source.unsplash.com/1600x900/?product/1",
                        "quantity": 33398
                      },
                      {
                        "id": 2,
                        "name": "Tasty Plastic Gloves",
                        "description": "Delectus odit fuga minima sapiente quia occaecati reprehenderit. Qui perspiciatis facere quia vero ut aut. Sapiente provident sapiente rerum dicta culpa quaerat earum reiciendis sed.",
                        "price": "739.00",
                        "imageUrl": "https://source.unsplash.com/1600x900/?product/2",
                        "quantity": 10401
                      },
                      {
                        "id": 3,
                        "name": "Practical Steel Chicken",
                        "description": "Deleniti et fugiat voluptas sequi ut magnam accusantium provident fugit. Accusamus exercitationem voluptatum sunt quasi.",
                        "price": "77.00",
                        "imageUrl": "https://source.unsplash.com/1600x900/?product/3",
                        "quantity": 94115
                      },
                      {
                        "id": 4,
                        "name": "Licensed Plastic Bacon",
                        "description": "Similique temporibus iste fuga explicabo adipisci. Sed sed rerum quasi. Distinctio libero voluptatem labore non.",
                        "price": "246.00",
                        "imageUrl": "https://source.unsplash.com/1600x900/?product/4",
                        "quantity": 72888
                      },
                      {
                        "id": 5,
                        "name": "Fantastic Rubber Towels",
                        "description": "Qui dolorem magnam ipsum maxime excepturi corporis pariatur vel. Velit quisquam ex sit repellat nesciunt ducimus ut. Et optio eaque nisi provident inventore voluptatem deleniti. Accusamus debitis sit magnam consequatur rerum aut.",
                        "price": "1000.00",
                        "imageUrl": "https://source.unsplash.com/1600x900/?product/5",
                        "quantity": 60719
                      }
                    ]
                  })
                ));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 401 })
                ));
            }
        }
    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
