package <%= packageName %>.presentation.navigation

interface NavigationService {
	fun goBack(): Boolean

	fun goTo(newTop: Any)

	fun replaceTo(newTop: Any)

	fun resetTo(newTop: Any)
}
