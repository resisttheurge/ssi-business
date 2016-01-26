package core.view.main;

import js.JQuery;
import js.html.HtmlElement;

class FieldMask {
    public static var dateField:HtmlElement -> Void = maskField.bind(_, "99/99/9999");
    public static var phoneField:HtmlElement -> Void = maskField.bind(_, "(999) 999-9999");
    public static var jobIdField:HtmlElement -> Void = maskField.bind(_, "a-&-*");

    private static function maskField(elem:HtmlElement, mask:String) {
        untyped new JQuery(elem).mask(mask);
    }
}
