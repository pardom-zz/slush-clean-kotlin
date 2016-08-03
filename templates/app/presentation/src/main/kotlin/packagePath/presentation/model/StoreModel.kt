package <%= packageName %>.presentation

import redux.Reducer
import redux.Store
import redux.Store.Subscriber

abstract class StoreModel<S : Any> : Store<S> {

	private val store by lazy { createStore() }

	abstract fun createStore(): Store<S>

	override fun getState() = store.getState()

	override fun replaceReducer(reducer: Reducer<S>) = store.replaceReducer(reducer)

	override fun subscribe(subscriber: Subscriber) = store.subscribe(subscriber)

	override fun dispatch(action: Any) = store.dispatch(action)
}
