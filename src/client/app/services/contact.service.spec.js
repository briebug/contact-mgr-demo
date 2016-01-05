/* jshint -W117, -W101 */
/* jscs:disable maximumLineLength */
(function () {
    'use strict';

    describe('contactService', function () {

        beforeEach(function() {
            bard.appModule('app.services');
            bard.inject(
                'contactService',
                '$httpBackend',
                '$rootScope'
            );
        });

        bard.verifyNoOutstandingHttpRequests();

        it('exists', function() {
            expect(contactService).to.exist();
        });

        describe('getAll() function', function() {
            it('exists', function() {
                expect(contactService.getAll).to.exist();
            });

            it('should make a GET call to /api/data', function() {
                // expect getAll() to use $http to make a call to '/api/data' - we don't care what the response is
                $httpBackend.expectGET('/api/data').respond('test');

                contactService.getAll();

                // flush() validates that the expected call was executed
                $httpBackend.flush();
            });

            it('should resolve the promise with the response data', function(done) {
                var expectedData = [{id: 1}, {id: 2}];
                // return expectedData JSON object when '/api/data' is called
                $httpBackend.whenGET('/api/data').respond(expectedData);

                contactService.getAll()
                    .then(function(data) {
                        // when the promise is resolved,
                        expect(data).to.deep.equal(expectedData);
                        done();
                    })
                    .catch(function(err) {
                        // if the promise is rejected, the test should fail
                        done(err);
                    });
                // flush() allows exectedData to be returned from the http call, and kicks off a digest cycle
                // (if a digest cycle isn't executed, the Angular promise is never resolved and the test will timeout)
                $httpBackend.flush();
            });
        });

        describe('getById() function', function() {
            it('exists', function() {
                expect(contactService.getById).to.exist();
            });

            it('should make a GET call to /api/data/{id}', function() {
                $httpBackend.expectGET('/api/data/1').respond('test');
                contactService.getById(1);
                $httpBackend.flush();
            });

            it('should resolve the promise with the response data', function(done) {
                var expectedData = {id: 1};
                $httpBackend.expectGET('/api/data/1').respond(expectedData);
                contactService.getById(1)
                    .then(function(data) {
                        expect(data).to.deep.equal(expectedData);
                        done();
                    })
                    .catch(function(err) {
                        // if the promise is rejected, the test should fail
                        done(err);
                    });
                $httpBackend.flush();
            });
        });

    });

})();
