package <%= packageName %>.app.usecase

import <%= packageName %>.app.usecase.Interactor.Request
import <%= packageName %>.app.usecase.Interactor.Response
import rx.Observable

interface Interactor<I : Request, O : Response> {

	fun execute(request: I): Observable<O>

	interface Request

	interface Response

}
