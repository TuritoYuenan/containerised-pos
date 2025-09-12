import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.outlined.AccountCircle
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material.icons.outlined.ShoppingCart
import androidx.compose.ui.graphics.vector.ImageVector

data class NavigationItem(
	val label: String,
	val iconSelected: ImageVector,
	val iconUnselected: ImageVector
)

enum class NavItem(label: String, iconSelected: ImageVector, iconUnselected: ImageVector) {
	TABLES("Tables", Icons.Filled.AccountCircle, Icons.Outlined.AccountCircle),
	ORDERS("Orders", Icons.Filled.ShoppingCart, Icons.Outlined.ShoppingCart),
	SETTINGS("Settings", Icons.Filled.Settings, Icons.Outlined.Settings),
	HELP("Help", Icons.Filled.Info, Icons.Outlined.Info)
}
