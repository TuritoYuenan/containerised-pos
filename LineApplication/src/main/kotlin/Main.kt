import androidx.compose.desktop.ui.tooling.preview.Preview
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.outlined.AccountCircle
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material.icons.outlined.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application

@Composable
private fun AppNavigation(items: List<NavigationItem>) {
	var selectedTab by remember { mutableIntStateOf(0) }
	NavigationBar {
		items.forEachIndexed { index, item ->
			NavigationBarItem(
				selected = selectedTab == index,
				onClick = { selectedTab = index },
				label = { Text(item.label) },
				icon = {
					Icon(
						if (selectedTab == index) item.iconSelected else item.iconUnselected,
						contentDescription = item.label
					)
				},
			)
		}
	}
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
@Preview
fun App() {
	val items = listOf(
		NavigationItem("Tables", Icons.Filled.AccountCircle, Icons.Outlined.AccountCircle),
		NavigationItem("Orders", Icons.Filled.ShoppingCart, Icons.Outlined.ShoppingCart),
		NavigationItem("Settings", Icons.Filled.Settings, Icons.Outlined.Settings),
		NavigationItem("Help", Icons.Filled.Notifications, Icons.Outlined.Notifications),
	)

	MaterialTheme {
		Scaffold(
			topBar = { TopAppBar(title = { Text("Manage Tables") }) },
			bottomBar = { AppNavigation(items) }
		) {}
	}
}

fun main() = application {
	Window(onCloseRequest = ::exitApplication) {
		App()
	}
}
